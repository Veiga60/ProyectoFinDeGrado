package com.ikerveiga.app.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.dao.WheelHardnessRepository;
import com.ikerveiga.app.dao.WheelModelRepository;
import com.ikerveiga.app.dao.WheelOrderRepository;
import com.ikerveiga.app.dao.WheelSizeRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.WheelHardness;
import com.ikerveiga.app.entity.WheelModel;
import com.ikerveiga.app.entity.WheelOrder;
import com.ikerveiga.app.entity.WheelSize;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class WheelOrderService {

    private WheelOrderRepository wheelOrderDAO;
    private PlayerRepository playerDAO;
    private OrderRepository orderDAO;
    private WheelModelRepository wheelModelDAO;
    private WheelHardnessRepository wheelHardnessDAO;
    private WheelSizeRepository wheelSizeDAO;

    @Autowired
    public WheelOrderService(WheelOrderRepository wheelOrderDAO, PlayerRepository playerDAO, OrderRepository orderDAO,
            WheelModelRepository wheelModelDAO, WheelHardnessRepository wheelHardnessDAO,
            WheelSizeRepository wheelSizeDAO) {
        this.wheelOrderDAO = wheelOrderDAO;
        this.playerDAO = playerDAO;
        this.orderDAO = orderDAO;
        this.wheelModelDAO = wheelModelDAO;
        this.wheelHardnessDAO = wheelHardnessDAO;
        this.wheelSizeDAO = wheelSizeDAO;
    }

    public List<WheelOrder> getWheelOrders() {
        List<WheelOrder> wheelOrders = wheelOrderDAO.findAll();

        return wheelOrders;
    }

    public List<WheelOrder> getWheelOrdersFromOrder(long orderId) {
        Order order = orderDAO.findById(orderId);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        List<WheelOrder> wheelOrders = wheelOrderDAO.findByOrder(order);

        return wheelOrders;
    }

    public void createWheelOrder(long playerId, String phoneNumber, long orderId, long modelId,
            long hardnessId, long sizeId, int amount) {

        Player player = playerDAO.findById(playerId);
        Order order = orderDAO.findById(orderId);

        if (LocalDateTime.now().isAfter(order.getDeadline())) {
            throw new RuntimeException("The order is expired");
        }

        WheelModel model = wheelModelDAO.findById(modelId);
        WheelHardness hardness = wheelHardnessDAO.findById(hardnessId);
        WheelSize size = wheelSizeDAO.findById(sizeId);

        WheelOrder wheelOrder = new WheelOrder(player, phoneNumber, order, model, hardness, size, amount);

        wheelOrderDAO.save(wheelOrder);
    }

    public void exportToExcel(List<Long> wheelOrdersIDs, HttpServletResponse response) throws IOException {

        List<WheelOrder> wheelOrders = wheelOrderDAO.findAllById(wheelOrdersIDs);

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Pedidos ruedas");
        HSSFRow row = sheet.createRow(0);

        row.createCell(0).setCellValue("Nombre");
        row.createCell(1).setCellValue("Apellidos");
        row.createCell(2).setCellValue("Nº Tfno");
        row.createCell(3).setCellValue("Modelo");
        row.createCell(4).setCellValue("Dureza");
        row.createCell(5).setCellValue("Tamaño");
        row.createCell(6).setCellValue("Cantidad");

        int dataRowIndex = 1;

        for (WheelOrder wheelOrder : wheelOrders) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex);
            dataRow.createCell(0).setCellValue(wheelOrder.getPlayer().getName());
            dataRow.createCell(1)
                    .setCellValue(wheelOrder.getPlayer().getLastName1() + ' ' + wheelOrder.getPlayer().getLastName2());
            dataRow.createCell(2).setCellValue(wheelOrder.getPhoneNumber());
            dataRow.createCell(3).setCellValue(wheelOrder.getModel().getDescription());
            dataRow.createCell(4).setCellValue(wheelOrder.getHardness().getDescription());
            dataRow.createCell(5).setCellValue(wheelOrder.getSize().getDescription());
            dataRow.createCell(6).setCellValue(wheelOrder.getAmount());

            dataRowIndex++;
        }

        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }
}
